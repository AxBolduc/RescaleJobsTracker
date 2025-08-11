from django.db import models
import uuid


# Create your models here.
class Job(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    name = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class JobStatus(models.Model):
    STATUSES = {
        "PENDING": "Pending",
        "RUNNING": "Running",
        "COMPLETED": "Completed",
        "FAILED": "Failed",
    }

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="status_log")
    status_type = models.CharField(max_length=32, choices=STATUSES)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]
