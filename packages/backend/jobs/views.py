from django.http import HttpRequest, JsonResponse
from uuid import UUID

from rest_framework.views import APIView
from rest_framework import generics

from jobs.serializers import JobSerializer
from .models import Job


class JobsView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class JobView(APIView):
    def delete(self, request: HttpRequest, job_id: UUID) -> JsonResponse:
        return JsonResponse({"message": "Hello delete {}".format(job_id)})

    def patch(self, request: HttpRequest, job_id: UUID) -> JsonResponse:
        return JsonResponse({"message": "Hello patch {}".format(job_id)})
