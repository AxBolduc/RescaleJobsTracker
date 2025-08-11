from http.client import NO_CONTENT
from uuid import UUID

from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins
from rest_framework.request import Request
from rest_framework.response import Response

from jobs.serializers import (
    JobSerializer,
)
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
    def get(self, request: Request, job_id: UUID) -> Response:
        db_job = Job.objects.get(id=job_id)
        serializer = JobSerializer(db_job)

        return Response(serializer.data)

    def delete(self, request: Request, job_id: UUID) -> Response:
        try:
            Job.objects.get(id=job_id).delete()
        except Job.DoesNotExist:
            return Response({"message": "Job does not exist"}, status=404)

        return Response({"status": "deleted"}, status=NO_CONTENT)

    def patch(self, request: Request, job_id: UUID) -> Response:
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"message": "Job does not exist"}, status=404)

        serializer = JobSerializer(job, data=request.data, partial=True)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        try:
            serializer.save()
        except Exception as e:
            return Response({"message": str(e)}, status=500)

        return Response(serializer.data)
