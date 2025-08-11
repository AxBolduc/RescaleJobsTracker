from rest_framework import serializers
from .models import Job, JobStatus

from django.db import transaction


class JobStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobStatus
        fields = ("id", "status_type", "timestamp")


class JobSerializer(serializers.ModelSerializer):
    statuses = JobStatusSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = ("id", "name", "created_at", "updated_at", "statuses")

    def create(self, validated_data):
        with transaction.atomic():
            job = Job.objects.create(**validated_data)

            JobStatus.objects.create(
                job=job,
                status_type=JobStatus.STATUSES["PENDING"],
            )

        return job
