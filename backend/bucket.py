import boto3
from boto3.s3.inject import bucket_copy
from django.conf import settings


class Bucket:
    def __init__(self):
        session = boto3.session.Session()
        self.conn = session.client(
            service_name=settings.AWS_SERVICE_NAME,
            aws_access_key_id=settings.AWS_S3_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_S3_SECRET_ACCESS_KEY,
            endpoint_url=settings.AWS_S3_ENDPOINT_URL
        )

    def set_cors(self):
        cors_configuration = {
            'CORSRules': [{
                'AllowedHeaders': ['Authorization', 'x-custom-header'],
                'AllowedMethods': ['GET'],
                'AllowedOrigins': ['127.0.0.1:3000', 'localhost:3000'],
                'ExposeHeaders': ['GET'],
                'MaxAgeSeconds': 86400
            }]
        }
        return self.conn.put_bucket_cors(
           Bucket=settings.AWS_STORAGE_BUCKET_NAME,
           CORSConfiguration=cors_configuration
        )

    def generate_download_link(self, key, expiration):
        self.set_cors()
        return self.conn.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': settings.AWS_STORAGE_BUCKET_NAME,
                'Key': key,
            },
            ExpiresIn=expiration
        )


bucket = Bucket()
