import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import Dropdown from 'react-bootstrap/Dropdown';
import { actions } from 'pages/library/actions';
import FolderForm from './folder-form';
import ImageForm from './image-form';

const NewAssetDropdown = ({ activeFolderId }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [formToShow, setFormToShow] = useState('');

  const onAssetCreate = (isOpen, { name, url, type }) => {
    setIsOpen(isOpen);
    setFormToShow('');

    const asset = {
      type,
      name
    }

    if (url) {
      asset.url = url;
    }

    if (activeFolderId) {
      asset.parent = activeFolderId;
    }

    dispatch(actions.createAsset(asset));
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
          { !formToShow &&
            <>
              <Dropdown.Item 
                eventKey="folder" 
                onSelect={(key) => {setIsOpen(true); setFormToShow(key)}}>Folder</Dropdown.Item>
              <Dropdown.Item 
                eventKey="image" 
                onSelect={(key) => {setIsOpen(true); setFormToShow(key)}}>Image</Dropdown.Item>
              <Dropdown.Item
                eventKey="video" 
                onSelect={setFormToShow}>Video</Dropdown.Item>
            </>
          }

          { formToShow === 'folder' && 
            <Dropdown.Item as={FolderForm} onToggle={onAssetCreate} /> 
          }
          { formToShow === 'image' && 
            <Dropdown.Item as={ImageForm} onToggle={onAssetCreate}/> 
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

export default NewAssetDropdown;