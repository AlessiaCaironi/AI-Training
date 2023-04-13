from django.test import TestCase
from myapp.models import Test
from myapp.models import Image
from myapp.tasks import resize_img

from io import BytesIO
import PIL
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys


class TestTestCase(TestCase):

    def setUp(self):
        # create new record Test with an image
        self.test_with_imgs = Test.objects.create(name='prova nome1', description='prova descrizione1')
  
        with PIL.Image.open('./myapp/tests/prova.jpg') as img, BytesIO() as output:
            img.save(output, format='JPEG', quality=100)
            output.seek(0)

            self.new_img = InMemoryUploadedFile(output, 'ImageField', "prova.jpg", 
                                                        'image/jpeg', sys.getsizeof(output), None)
        
            self.new_image = Image.objects.create(path_input=self.new_img, test_id=self.test_with_imgs)
            
            self.new_img.close()

        # create new record Test without images
        self.test_without_imgs = Test.objects.create(name='prova nome2', description='prova descrizione2')
    
    def test_resize_img__ok(self):
        # start task   
        self.result = resize_img(self.test_with_imgs.pk)
        self.test_with_imgs.refresh_from_db()
        self.new_image.refresh_from_db()

        # task celery completato
        self.assertEqual(self.result, "Resize done")

        # task ha impostato time_start
        self.assertIsNotNone(self.test_with_imgs.time_start)

        # task ha impostato time_end
        self.assertIsNotNone(self.test_with_imgs.time_end)

        # task ha creato img di output
        self.assertIsNotNone(self.new_image.path_output)

        # nome file in path_input e nome file in path_output corrispondono
        self.assertEqual(self.new_image.path_input.name.split('/')[1], self.new_image.path_output.name.split('/')[1])
        
        # check riferimento test id
        self.assertEqual(self.test_with_imgs.pk, self.new_image.test_id.pk)
        
    
    def test_resize_img__not_ok(self):
        # start task and check that raise an exception 
        self.assertRaises(Exception, resize_img(self.test_without_imgs.pk))

    
