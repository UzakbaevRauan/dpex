# Create your views here.
from .models import UserProfile
import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def register_user(request):

  response = HttpResponse()
  response["Access-Control-Allow-Origin"] = "http://localhost:3000"

  if request.method == 'POST':

      data = json.loads(request.body)
      first_name = data.get('first_name')
      last_name = data.get('last_name')
      username = data.get('username')
      phone_number = data.get('phone_number')
      person_iin = data.get('person_iin')
      password1 = data.get('password1')
      password2 = data.get('password2')
      # Create a new user profile
      user_profile = UserProfile(first_name=first_name, last_name=last_name, username =username,
                                 phone_number = phone_number , person_iin = person_iin,  password1 = password1, password2 = password2)
      user_profile.save()

      return JsonResponse({'message': 'User registered successfully'})

  return JsonResponse({'message': 'Invalid request method'})



@csrf_exempt
def login_user(request):
    response = JsonResponse({})  # Provide initial empty data
    response["Access-Control-Allow-Origin"] = "http://localhost:3000"

    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            password1 = data.get('password1')
            user_exists = UserProfile.objects.filter(username = username, password1=password1).exists()

            return JsonResponse({'user_exists': user_exists})
        except json.JSONDecodeError as e:
            response.status_code = 400  # Bad Request
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    else:
        response.status_code = 405  # Method Not Allowed
        return response

