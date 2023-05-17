from celery import shared_task
from .models import Image, Item
import sys, datetime, PIL
from PIL import ImageEnhance
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile  

@shared_task(bind=True)
def preprocessing_img(self, itemid, *args, **kwargs):
    
    item = Item.objects.get(id=itemid)
    item.time_start = datetime.datetime.utcnow()          # timestamp start preprocessing

    queryset = Image.objects.filter(item_id=itemid)       

    for elem in queryset:
        # open image
        with PIL.Image.open(elem.path_input) as img, BytesIO() as output:
            
            width, height = img.size
            img =img.resize((width,width))                # resize

            enhancer = ImageEnhance.Contrast(img)
            img = enhancer.enhance(1.5)                   # increase contrast

            format = elem.path_input.name.split('.')[1]

            if format==f'png':
                img_format = 'png'
                extension = 'png'
            else: 
                img_format = 'jpeg'
                extension = 'jpg'

            # after modifications, save it to the output
            img.save(output, format=img_format, quality=100)
            output.seek(0)
                
            # change the path_output value to be the newley modified image value
            elem.path_output = InMemoryUploadedFile(output, 'ImageField', 
                                                    elem.path_input.name.split('.')[0] + "." + extension, 
                                                    'image/'+img_format, sys.getsizeof(output), None)

            elem.save(update_fields=["path_output"])   
            elem.path_input.close()
            elem.path_output.close()

    item.time_end = datetime.datetime.utcnow()             # timestamp end preprocessing
    item.save(update_fields=["time_start", "time_end"])

    return "Processing done"