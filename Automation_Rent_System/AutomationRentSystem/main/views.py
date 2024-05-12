from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from .models import TransportDetail, TransportModel
from .forms import TransportDetailForm

def transport_list(request):
    transport_list = TransportDetail.objects.all()
    data = []
    for item in transport_list:
        item_data = {
            'id': item.id,
            'brand': item.brand.name,
            'model': item.model.name,
            'bodyType': item.body_type.name,
            'price': item.price,
            'year': item.year,
            'image': request.build_absolute_uri(item.main_photo.url) if item.main_photo else None

        }
        data.append(item_data)
    return JsonResponse(data,safe=False)

def transport_detail(request, transport_id):
    transport = get_object_or_404(TransportDetail, id=transport_id)
    data = {
        'id': transport.id,
        'brand': transport.brand.name,
        'model': transport.model.name,
        'bodyType': transport.body_type.name,
        'price': transport.price,
        'year': transport.year,
        'image': request.build_absolute_uri(transport.main_photo.url) if transport.main_photo else None
    }
    return JsonResponse(data)


def add_ad(request):
    if request.method == 'POST':
        form = TransportDetailForm(request.POST, request.FILES)
        if form.is_valid():
            transport = form.save(commit=False)
            transport.user = request.user
            transport.save()
            return redirect('main:transport_list')
    else:
        form = TransportDetailForm()
    return render(request, 'main/add_transport.html', {'form': form})

def get_models_by_brand(request, brand_id):
    models = TransportModel.objects.filter(brand_id=brand_id).values('id', 'name')
    return JsonResponse({'models': list(models)})
