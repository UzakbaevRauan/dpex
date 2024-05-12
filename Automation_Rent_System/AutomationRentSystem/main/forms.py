from django import forms
from .models import TransportDetail, TransportPhoto

class TransportPhotoForm(forms.ModelForm):
    class Meta:
        model = TransportPhoto
        fields = ['photo']

class TransportDetailForm(forms.ModelForm):
    class Meta:
        model = TransportDetail
        fields = ['brand', 'model', 'year', 'body_type', 'seats', 'price', 'transmission', 'location', 'main_photo', 'description']
