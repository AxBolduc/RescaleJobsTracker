from rest_framework import serializers
from .models import Job, JobStatus


class JobStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobStatus
        fields = ("id", "status_type", "timestamp")


class JobSerializer(serializers.ModelSerializer):
    latest_status = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = ("id", "name", "created_at", "updated_at", "latest_status")

    def get_latest_status(self, obj):
        latest_status_obj = obj.statuses.order_by("-timestamp").first()

        if latest_status_obj:
            return JobStatusSerializer(latest_status_obj).data
        else:
            return None
