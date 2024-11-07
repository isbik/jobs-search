export const operations = {
    "get_users-me": {
        "path": "/users/me",
        "method": "get"
    },
    "post_auth-register": {
        "path": "/auth/register",
        "method": "post"
    },
    "post_auth-login": {
        "path": "/auth/login",
        "method": "post"
    },
    "post_auth-logout": {
        "path": "/auth/logout",
        "method": "post"
    },
    "get_jobs": {
        "path": "/jobs",
        "method": "get"
    },
    "post_jobs": {
        "path": "/jobs",
        "method": "post"
    },
    "get_jobs-categories": {
        "path": "/jobs/categories",
        "method": "get"
    },
    "get_jobs-jobid": {
        "path": "/jobs/:jobId",
        "method": "get"
    },
    "delete_jobs-jobid": {
        "path": "/jobs/:jobId",
        "method": "delete"
    },
    "get_companies": {
        "path": "/companies",
        "method": "get"
    },
    "post_companies": {
        "path": "/companies",
        "method": "post"
    },
    "get_companies-companyid": {
        "path": "/companies/:companyId",
        "method": "get"
    },
    "put_companies-companyid": {
        "path": "/companies/:companyId",
        "method": "put"
    },
    "get_internal-jobs": {
        "path": "/internal/jobs",
        "method": "get"
    },
    "patch_internal-jobs-jobid": {
        "path": "/internal/jobs/:jobId",
        "method": "patch"
    }
} as const;