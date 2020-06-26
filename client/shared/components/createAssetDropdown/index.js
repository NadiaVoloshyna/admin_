import React, { useState } from 'react';
import cx from 'classnames';
import _upperFirst from 'lodash/upperFirst';
import _toLower from 'lodash/toLower';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Folder from './folder';
import Image from './image';
import Album from './album';
import Audio from './audio';

export const ASSET_TYPES = {
  FOLDER: 'FOLDER',
  IMAGE: 'IMAGE',
  ALBUM: 'ALBUM',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO'
};

const availableAssets = {
  FOLDER: {
    name: 'FOLDER',
    icon: 'folder',
    component: Folder
  },
  IMAGE: {
    name: 'IMAGE',
    icon: 'image',
    component: Image
  },
  ALBUM: {
    name: 'ALBUM',
    icon: 'compact-disc',
    component: Album
  },
  AUDIO: {
    name: 'AUDIO',
    icon: 'file-audio',
    component: Audio
  }
};

const createAssetShape = (props) => {
  const { name, url, type, year, description, author } = props;

  switch (type) {
    case ASSET_TYPES.IMAGE:
      return {
        type,
        name,
        url
      };
    case ASSET_TYPES.ALBUM:
      return {
        type,
        name,
        url,
        year,
        description,
        author
      };
    default:
      return {
        type,
        name
      };
  }
};

const CreateAssetDropdown = ({ onAssetCreate, supportedTypes = [] }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ formToShow, setFormToShow ] = useState(null);

  const onDropdownToggle = (isOpen = false, form = null) => {
    setIsOpen(isOpen);
    setFormToShow(form);
  };

  const onCreate = (item) => {
    onDropdownToggle();

    const asset = createAssetShape(item);
    onAssetCreate(asset);
  };

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
                <FontAwesomeIcon icon={availableAssets[item].icon} className="mr-2" />
                { _upperFirst(_toLower(item)) }
              </Dropdown.Item>
            );
          })}

          { formToShow
            && (
            <Dropdown.Item
              className="min-w-50"
              as={availableAssets[formToShow].component}
              onSubmit={onCreate}
              onDismiss={onDropdownToggle}
            />
            )}
        </Dropdown.Menu>
      </Dropdown>

      <style global jsx>{`
        .create-dropdown .dropdown-toggle:after {
          display: none;
        }
      `}</style>
    </>
  );
};

export default CreateAssetDropdown;
