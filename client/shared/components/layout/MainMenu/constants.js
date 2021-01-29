import { PAGE_NAMES } from 'shared/constants';

export const NAV_LINKS = [{
  name: PAGE_NAMES.DASHBOARD,
  url: '/',
  icon: 'assessment',
}, {
  name: PAGE_NAMES.PERSONS,
  url: '/persons',
  icon: 'people',
}, {
  name: PAGE_NAMES.LIBRARY,
  url: '/library',
  visibleTo: ['super', 'admin', 'author'],
  icon: 'perm_media',
}, {
  name: PAGE_NAMES.PROFESSIONS,
  url: '/professions',
  icon: 'list_alt',
}, {
  name: PAGE_NAMES.USERS,
  url: '/users',
  visibleTo: ['super', 'admin'],
  icon: 'contacts',
}, {
  name: 'Notifications', // TODO: update when the screen will be implemented
  url: '/notifications',
  icon: 'notifications',
}, {
  name: 'Settings', // TODO: update when the screen will be implemented
  url: '/settings',
  icon: 'settings',
}, {
  name: PAGE_NAMES.PERMISSIONS,
  url: '/permissions',
  visibleTo: ['super', 'admin'],
  icon: 'subtitles',
}];
