from django.http import HttpRequest, HttpResponse, JsonResponse
from django.middleware.csrf import get_token


def csrf_token_view(request: HttpRequest) -> HttpResponse:
    token = get_token(request)

    return JsonResponse({"csrfToken": token})
