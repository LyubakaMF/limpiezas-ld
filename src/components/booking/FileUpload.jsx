import React, { useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Paperclip, X, Loader2, ImageIcon } from 'lucide-react';

export default function FileUpload({ fileUrls, onChange, label, hint }) {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const urls = [];
    for (const file of files) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      urls.push(file_url);
    }
    onChange([...(fileUrls || []), ...urls]);
    setUploading(false);
    inputRef.current.value = '';
  };

  const remove = (url) => onChange((fileUrls || []).filter((u) => u !== url));

  return (
    <div>
      <p className="text-sm font-medium mb-3">{label}</p>
      <div
        className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:bg-accent/50 transition-colors"
        onClick={() => inputRef.current.click()}
      >
        {uploading ? (
          <Loader2 className="w-6 h-6 text-muted-foreground mx-auto animate-spin" />
        ) : (
          <>
            <Paperclip className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">{hint}</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFiles}
        />
      </div>

      {fileUrls && fileUrls.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {fileUrls.map((url, i) => (
            <div key={i} className="relative group w-20 h-20 rounded-lg overflow-hidden border bg-muted">
              {url.match(/\.(mp4|mov|webm)$/i) ? (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                </div>
              ) : (
                <img src={url} alt="" className="w-full h-full object-cover" />
              )}
              <button
                type="button"
                onClick={() => remove(url)}
                className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}