from django.contrib import admin
from .models import TransportBrand, TransportDetail, TransportType, TransportModel, TransportPhoto, Booking, Transmission
# Register your models here.
admin.site.register(TransportBrand)
admin.site.register(TransportDetail)
admin.site.register(TransportModel)
admin.site.register(TransportPhoto)
admin.site.register(TransportType)
admin.site.register(Booking)
admin.site.register(Transmission)