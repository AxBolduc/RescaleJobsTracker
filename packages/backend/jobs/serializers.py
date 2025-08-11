from rest_framework import serializers
from .models import Job, JobStatus

from django.db import transaction


class JobStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobStatus
        fields = ("id", "status_type", "timestamp")


class JobSerializer(serializers.ModelSerializer):
    status_log = JobStatusSerializer(many=True, read_only=True)

    status = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Job
        fields = ("id", "name", "created_at", "updated_at", "status_log", "status")

    def create(self, validated_data):
        with transaction.atomic():
            job = Job.objects.create(**validated_data)

            JobStatus.objects.create(
                job=job,
                status_type=JobStatus.STATUSES["PENDING"],
            )

        return job

    def update(self, instance, validated_data):
        input_status = validated_data.get("status")

        if input_status:
            JobStatus.objects.create(
                job=instance,
                status_type=JobStatus.STATUSES[input_status],
            )

        return instance
