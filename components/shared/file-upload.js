import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Field } from 'react-final-form';
import cx from 'classnames';
import UPLOAD_FILE from 'queries/mutations/file.gql';

const FileUpload = ({src}) => {
  const apolloClient = useApolloClient();

  const [uploadFile, { loading, data }] = useMutation(UPLOAD_FILE, {
    update (cache, { data: { uploadFile } }) {
      apolloClient.writeData({
        data: {
          person: {
            __typename: 'Person',
            portraits: {
              __typename: 'Portraits',
              primary: uploadFile
            }
          }
        }
      })
    }
  });

  if (loading) return null;

  // if (data && data.uploadFile) return (
  //   <img className="img-fluid" src={`/images/${data.uploadFile}`} alt="" />
  // );

  return (
    <div className="upload-file">
      <Field 
        name="primaryPortrait"
        id="primaryPortrait"
        className="inputfile"
        component="input"
        type="file"
        accept="image/*"
        onChange={({
          target: {
            validity,
            files: [file]
          }
        }) => {
          validity.valid &&
          uploadFile({ variables: { file } })}
        }
      />
      <label 
        htmlFor="primaryPortrait"
        className={cx(
          'd-flex', 
          'justify-content-center', 
          'align-items-center', 
          !src && 'text-muted',
          src && 'has-image'
        )}
      >
        Upload Image
      </label>

      <style global jsx>{`
        .upload-file {
          height: 100%;
          width: 100%;
        }

        .inputfile {
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
          overflow: hidden;
          position: absolute;
          z-index: -1;
        }

        .inputfile + label {
          height: 100%;
          width: 100%;
          color: white;
          display: inline-block;
        }
        
        .inputfile:focus + label,
        .inputfile + label:hover {
          background-color: var(--light);
          cursor: pointer;
        }

        .inputfile + label.has-image {
          background: transparent url('/images/${src}') no-repeat center/100%;
          color: transparent;
        }
      `}</style>
    </div>
  )
}

export default FileUpload;