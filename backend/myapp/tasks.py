from celery import shared_task
from .models import Image
from .models import Test
import PIL
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys
import datetime 


@shared_task(bind=True)
def resize_img(self, testid, *args, **kwargs):

    test = Test.objects.get(id=testid)
    test.time_start = datetime.datetime.utcnow()

    # select all the images that have (test_id == testid)
    queryset = Image.objects.filter(test_id=testid)

    for item in queryset:
        # open image
        img = PIL.Image.open(item.path_input)
        
        output = BytesIO()

        # resize the image
        width, height = img.size
        img =img.resize((width,width))

        format = item.path_input.name.split('.')[1]

        if format==f'png':
            # after modifications, save it to the output
            img.save(output, format='png', quality=100)
            output.seek(0)
            
            # change the path_output value to be the newley modified image value
            item.path_output = InMemoryUploadedFile(output, 'ImageField', 
                                                     "%s.png" %item.path_input.name.split('.')[0], 
                                                     'image/png', sys.getsizeof(output), None)
        # jpg
        else:
            # after modifications, save it to the output
            img.save(output, format='JPEG', quality=100)
            output.seek(0)
            
            # change the path_output value to be the newley modified image value
            item.path_output = InMemoryUploadedFile(output, 'ImageField', 
                                                         "%s.jpg" %item.path_input.name.split('.')[0], 
                                                         'image/jpeg', sys.getsizeof(output), None)
       
        item.save(update_fields=["path_output"])   
    

    test.time_end = datetime.datetime.utcnow()
    test.save(update_fields=["time_start", "time_end"])

    print(test.time_end - test.time_start)

    return "Resize done"