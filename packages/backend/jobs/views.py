from django.http import HttpRequest, JsonResponse
from uuid import UUID

from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins
from rest_framework.request import Request
from rest_framework.response import Response

from jobs.serializers import JobSerializer
from .models import Job


class JobsView(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get(self, request: Request, *args, **kwargs) -> Response:
        """
        GET /jobs
        Get all jobs
        """
        return self.list(request, *args, **kwargs)

    def post(self, request: Request) -> Response:
        """
        POST /jobs
        Create a new job
        """
        serializer = JobSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        serializer.save()
        return Response(serializer.data, status=201)


class JobView(APIView):
    def delete(self, request: HttpRequest, job_id: UUID) -> JsonResponse:
        return JsonResponse({"message": "Hello delete {}".format(job_id)})

    def patch(self, request: HttpRequest, job_id: UUID) -> JsonResponse:
        return JsonResponse({"message": "Hello patch {}".format(job_id)})
