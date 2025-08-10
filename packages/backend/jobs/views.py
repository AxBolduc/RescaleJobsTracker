from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views import View
from uuid import UUID


class JobsView(View):
    def get(self, request: HttpRequest) -> HttpResponse:
        return JsonResponse({"message": "Hello World"})

    def post(self, request: HttpRequest) -> HttpResponse:
        return JsonResponse({"message": "Hello post"})


class JobView(View):
    def delete(self, request: HttpRequest, job_id: UUID) -> HttpResponse:
        return JsonResponse({"message": "Hello delete {}".format(job_id)})

    def patch(self, request: HttpRequest, job_id: UUID) -> HttpResponse:
        return JsonResponse({"message": "Hello patch {}".format(job_id)})
