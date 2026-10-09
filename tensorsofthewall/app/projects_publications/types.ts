import data from '@/public/data/resume_json.json';

export type Publication = (typeof data.publications)[number];
export type Project = (typeof data.projects)[number];

export const SCHOLAR_URL = 'https://scholar.google.com/citations?user=1JcdIt8AAAAJ&hl=en';
