import React, { useState, VFC } from 'react'
import { Field } from 'formik'
import { Grid } from '@material-ui/core'
import ReactImageBase64 from 'react-image-base64'

type Props = {
  label: string
  name: string
}

export const ImageFileInput: VFC<Props> = ({ label, name , ...rest}) => {
  const [photoErrors, setPhotoErrors] = useState<string[]>([])

  return (
    <div className="form-control">
      <p>{label}</p>
      <Grid item container spacing={1} justifyContent="center">
        <Grid item xs={12} sm={6} md={6}>
          <Field name={name} {...rest}>
            {({ form }) => {
              const { setFieldValue } = form
              return (
                <>
                  <ReactImageBase64
                    maxFileSize={10485760}
                    thumbnail_size={100}
                    drop={true}
                    dropText="写真をドラッグ＆ドロップもしくは"
                    capture="environment"
                    multiple={false}
                    handleChange={(data) => {
                      if (data.result) {
                        setFieldValue('photo', data.fileData)
                      } else {
                        setPhotoErrors([...photoErrors, ...data.messages])
                      }
                    }}
                  />
                  {photoErrors.map((error, index) => (
                    <p className="error" key={index}>
                      {error}
                    </p>
                  ))}
                </>
              )
            }}
          </Field>
        </Grid>
      </Grid>
    </div>
  )
}

export default ImageFileInput