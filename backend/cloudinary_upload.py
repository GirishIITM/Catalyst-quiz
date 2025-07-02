import cloudinary
import cloudinary.uploader
import os

def upload_note_file(note_file, teacher_id, classroom_id=None):
    """
    Upload a note file (PDF, DOCX, etc.) to Cloudinary.
    Args:
        note_file: File object from request.files (should be a file-like object)
        teacher_id: ID of the teacher uploading the note
        classroom_id: (Optional) Classroom ID for organizing uploads
    Returns:
        dict: Upload result from Cloudinary or None if failed
    """
    try:
        folder = f"notes/teacher_{teacher_id}"
        if classroom_id:
            folder += f"/classroom_{classroom_id}"
        upload_options = {
            'folder': folder,
            'resource_type': 'auto',  # auto-detect file type (pdf, docx, etc.)
            'overwrite': False,       # Do not overwrite by default
            'use_filename': True,     # Use original filename
            'unique_filename': True  # Ensure unique filenames
        }
        result = cloudinary.uploader.upload(note_file, **upload_options)
        return result
    except Exception as e:
        print(f"Cloudinary note upload error: {e}")
        return None 