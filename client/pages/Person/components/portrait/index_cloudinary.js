import React, { useState } from 'react';
import _unescape from 'lodash/unescape';
import { Field } from 'react-final-form';
import { Image, Transformation } from 'cloudinary-react';
import dynamic from 'next/dynamic'

const MediaLibrary = dynamic(
  () => import('../../../../shared/components/mediaLibrary'),
  { ssr: false }
)

const PersonPortrait = ({ portrait, name = '' }) => {
  const [image, setImage] = useState(_unescape(portrait).replace(/&#x2F;/g, '/'));

  return (
    <div className="card mb-3">
      <div className="card-header">
        Portraits
      </div>

      <div className="portrait card-body"> 
        <Field name="portrait">
          {props => {
            const onSelect = (({assets}) => {
              props.input.onChange(assets[0].public_id);
              setImage(assets[0].public_id);
            });

            if (image) {
              return <Image
                cloudName="ukrainian" 
                publicId={image}
                height="235"
                crop="fill" 
              />
            }

            return <MediaLibrary 
              onMediaSelect={onSelect}
              btnText="Select Portrait"
              openOptions={{
                folder: {
                  path: name, resource_type: 'image'
                }
              }}
            />
          }}
        </Field>
      </div>
      <style global jsx>{`
        .portrait {
          height: 276px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .portrait img {
          max-height: 100%;
          max-width: 100%;
        }
      `}</style>
    </div>
  )
}

export default PersonPortrait;
