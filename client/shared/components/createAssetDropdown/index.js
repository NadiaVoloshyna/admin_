import React, { useState } from 'react';
import cx from 'classnames';
import _upperFirst from 'lodash/upperFirst';
import _toLower from 'lodash/toLower';
import Dropdown from 'react-bootstrap/Dropdown';
import Folder from './folder';
import Image from './image';
import Album from './album';

export const ASSET_TYPES = {
  FOLDER: 'FOLDER',
  IMAGE: 'IMAGE',
  ALBUM: 'ALBUM'
}

const availableAssets = {
  FOLDER: Folder,
  IMAGE: Image,
  ALBUM: Album
}

const CreateAssetDropdown = ({ onAssetCreate, supportedTypes = [] }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ formToShow, setFormToShow ] = useState('');

  const onCreate = (isOpen, { name, url, type }) => {
    setIsOpen(isOpen);
    setFormToShow('');

    const asset = {
      type,
      name
    }

    if (url) {
      asset.url = url;
    }

    onAssetCreate(asset);
  }

  return (
    <>
      <Dropdown
        className="create-dropdown"
        show={isOpen} 
        focusFirstItemOnShow={false}
        onToggle={(isOpen) => {
          !formToShow && setIsOpen(isOpen)
        }}
      >
        <Dropdown.Toggle>New</Dropdown.Toggle>
        <Dropdown.Menu className={cx(formToShow && 'w-100 p-2 bg-light')}>
          { !formToShow && supportedTypes.map(item => {
            return (
              <Dropdown.Item 
                eventKey={item} 
                onSelect={(item) => {setIsOpen(true); setFormToShow(item)}}
              >
                { _upperFirst(_toLower(item)) }
              </Dropdown.Item>
            )
          })}

          { formToShow && 
            <Dropdown.Item as={availableAssets[formToShow]} onToggle={onCreate} /> 
          }
        </Dropdown.Menu>
      </Dropdown>

      <style global jsx>{`
        .create-dropdown .dropdown-toggle:after {
          display: none;
        }
      `}</style>
    </>
  )
}

export default CreateAssetDropdown;