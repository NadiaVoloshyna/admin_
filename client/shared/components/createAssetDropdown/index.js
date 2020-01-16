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
  ALBUM: 'ALBUM',
  VIDEO: 'VIDEO'
}

const availableAssets = {
  FOLDER: Folder,
  IMAGE: Image,
  ALBUM: Album
}

const createAssetShape = (props) => {
  const { name, url, type, year, description, artist } = props;

  switch (type) {
    case ASSET_TYPES.IMAGE:
      return {
        type,
        name,
        url
      }
    case ASSET_TYPES.ALBUM:
      return {
        type,
        name,
        url,
        year,
        description,
        artist
      }
    default:
      return {
        type,
        name
      }
  }
}

const CreateAssetDropdown = ({ onAssetCreate, supportedTypes = [] }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ formToShow, setFormToShow ] = useState(null);

  const onDropdownToggle = (isOpen = false, form = null) => {
    setIsOpen(isOpen);
    setFormToShow(form);
  }

  const onCreate = (item) => {
    onDropdownToggle();

    const asset = createAssetShape(item);
    onAssetCreate(asset);
  }

  const onAssetTypeSelect = (form) => {
    setIsOpen(true);
    setFormToShow(form);
  }

  return (
    <>
      <Dropdown
        className="create-dropdown w-100"
        show={isOpen} 
        focusFirstItemOnShow={false}
        onToggle={(isOpen) => onDropdownToggle(isOpen)}
      >
        <Dropdown.Toggle>New Asset</Dropdown.Toggle>
        <Dropdown.Menu 
          className={cx(formToShow && 'w-100 p-2 bg-light')} 
          rootCloseEvent="click"
        >
          { !formToShow && supportedTypes.map(item => {
            return (
              <Dropdown.Item
                key={item}
                eventKey={item} 
                onSelect={(form) => onDropdownToggle(true, form)}
              >
                { _upperFirst(_toLower(item)) }
              </Dropdown.Item>
            )
          })}

          { formToShow && 
            <Dropdown.Item 
              className="min-w-50"
              as={availableAssets[formToShow]} 
              onSubmit={onCreate}
              onDismiss={onDropdownToggle}
            /> 
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