import React, { useState } from 'react';
import { shape } from 'prop-types';
import { UserType } from 'common/prop-types/authorization/user';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import { ERROR_MESSAGES, PAGE_NAMES } from 'shared/constants';
import Layout from 'shared/components/layout';
import UserApi from './api';
import UserInfo from './components/userInfo';
import UploadDrawer from './components/uploadDrawer';

// _app.js will replace user prop with currently logged in user
// so we use currentUser to pass user from HOC. Confusing, right :)
const UserPage = (props) => {
  const { user } = props;
  const [ currentUser, setUser ] = useState(props.currentUser);
  const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);
  const handleError = useErrorHandler();

  const {
    fullName,
  } = currentUser;

  const canEdit = user._id === currentUser._id;

  const onEdit = canEdit
    ? () => setIsDrawerOpen(true)
    : null;

  const onUpload = async (file) => {
    try {
      await UserApi.update(currentUser._id, {
        image: file
      });

      setUser({
        ...currentUser,
        image: file,
      });
    } catch (error) {
      handleError(error, ERROR_MESSAGES.USERS_EDIT_USER);
    }
  };

  return (
    <div>
      <Layout activePage={PAGE_NAMES.PROFILE} user={user}>
        <Layout.Navbar className="mb-3">
          <h3>{ fullName }</h3>
        </Layout.Navbar>

        <Layout.Content>
          <UserInfo
            user={currentUser}
            onEdit={onEdit}
          />
        </Layout.Content>
      </Layout>

      <UploadDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onUpload={onUpload}
      />
    </div>
  );
};

UserPage.propTypes = {
  user: shape(UserType).isRequired,
  currentUser: shape(UserType).isRequired,
};

export default UserPage;
