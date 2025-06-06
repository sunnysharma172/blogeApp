import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'


export default function RTE({ name, control, defaultValue = '', ...props }) {
  return (
   <div className='w-full'>
    {label && <label className='inline-block mb-1 pl-1'>{label}</label> }
    <Controller
      name={name || "content"}
      control={control}
      defaultValue={defaultValue}
      render={({ field:{onChange} }) => (
        <Editor
          {...field}
          apiKey="your-api-key-here"
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            branding: false,
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
            onEditorChange={(content, editor) => onChange(content)}
            {...props}
        />
      )}
    />
   </div>
  )
}
