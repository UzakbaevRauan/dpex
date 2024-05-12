from django.db import models
from decimal import Decimal
from django.core.validators import MinValueValidator, MaxValueValidator
#from user.models import UserProfile

class TransportBrand(models.Model):
    name = models.CharField(max_length=120, unique=True)

    def __str__(self):
        return self.name

class TransportModel(models.Model):
    brand = models.ForeignKey(to=TransportBrand, on_delete=models.CASCADE)
    name = models.CharField(max_length=128, unique=True)

    def __str__(self):
        return self.name

class TransportType(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name

class Transmission(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name

class TransportDetail(models.Model):
    brand = models.ForeignKey(to=TransportBrand, on_delete=models.CASCADE)
    model = models.ForeignKey(to=TransportModel, on_delete=models.CASCADE)
    year = models.IntegerField(
        validators=[MinValueValidator(1970), MaxValueValidator(2200)]
    )
    body_type = models.ForeignKey(to=TransportType, on_delete=models.CASCADE)
    seats = models.IntegerField(default=5)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    transmission = models.ForeignKey(to=Transmission, on_delete=models.CASCADE)
    location = models.CharField(max_length=32)
    main_photo = models.ImageField(upload_to='transport_photos/')
    description = models.TextField()
    #user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.brand.name} {self.model.name} ({self.year})"

class TransportPhoto(models.Model):
    transport = models.ForeignKey(TransportDetail, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='transport_photos/')

    def __str__(self):
        return f"Photo for {self.transport}: {self.photo.url}"

class Booking(models.Model):
    transport = models.ForeignKey(TransportDetail, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()


