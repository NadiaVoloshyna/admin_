import _sortBy from 'lodash/sortBy';
import _upperFirst from 'lodash/upperFirst';
import { USER_ROLES } from 'common/constants';

export const reduceResource = (items, name) => {
  return items.reduce((acc, next) => {
    if (!acc[next[name]]) {
      acc[next[name]] = [];
    }

    acc[next[name]].push(next);
    return acc;
  }, {});
};

export const flattenObject = (items, [key, value]) => {
  return Object.entries(items).map(([resource, actions]) => ({
    [key]: resource,
    [value]: actions,
  }));
};

export const flattenPermissions = (permissions) => {
  permissions = reduceResource(permissions, 'resource');
  permissions = flattenObject(permissions, ['resource', 'actions']);

  return permissions.map(item => {
    const actionsObj = reduceResource(item.actions, 'action');
    let actions = flattenObject(actionsObj, ['action', 'roles']);
    actions = actions.map(action => {
      return {
        ...action,
        roles: _sortBy(action.roles, ['role']),
      };
    });

    return {
      ...item,
      actions,
    };
  });
};

export const getResources = (permissions) => {
  return permissions.reduce((acc, next) => {
    if (acc.indexOf(next.resource) === -1) acc.push(next.resource);
    return acc;
  }, []).map(item => ({ value: item, label: item }));
};

export const getRoles = () => {
  return Object.keys(USER_ROLES).map(item => ({
    value: item.toLowerCase(),
    label: _upperFirst(item.toLowerCase()),
  }));
};

export const getActions = (permissions, resource, role) => {
  return permissions
    .filter(item => item.resource === resource && item.role === role)
    .map(item => ({
      value: item.action,
      label: _upperFirst(item.action.toLowerCase()),
    }));
};
