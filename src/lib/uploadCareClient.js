import { UploadcareSimpleAuthSchema } from '@uploadcare/rest-client';
import { PUBLIC_UC_KEY } from '$env/static/public';
import { PRIVATE_UC_KEY } from '$env/static/private';

const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({ publicKey: PUBLIC_UC_KEY, secretKey: PRIVATE_UC_KEY, });

export default uploadcareSimpleAuthSchema