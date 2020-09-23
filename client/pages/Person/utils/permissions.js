// TODO: move this to the Person page level.
// Investigate how to make it more elegant
export default class Permissions {
  constructor(user, person) {
    const { status } = person;

    this.user = user;
    this.person = person;

    this.status = status;

    this.isNew = status === 'NEW';
    this.isInProgress = status === 'IN_PROGRESS';
    this.inReview = status === 'IN_REVIEW';

    this.isAdmin = user.role === 'admin';
    this.isSuper = user.role === 'super';

    this.isDocAuthor = this.checkRole('author');
    this.isDocReviewer = this.checkRole('reviewer');
  }

  checkRole(role) {
    return this.person.drivePermissions.some(item => item.user.role === role);
  }

  /**
   * Whether current user can edit current post
   */
  canEdit() {
    return this.user.updateAny('persons') || (this.isDocAuthor && this.user.updateOwn('persons'));
  }

  /**
   * Whether current user can change status of the post
   */
  canChangeStatus() {
    return this.user.changeStatus('persons', this.status)
      && (this.isDocAuthor || this.isDocReviewer || this.isAdmin || this.isSuper);
  }

  /**
   * Whether user can edit document
   */
  canEditDocument() {
    return this.user.editOwn('document') && this.isDocAuthor && this.isInProgress;
  }

  /**
   * Whether user can review document
   */
  canReviewDocument() {
    return this.user.reviewOwn('document') && this.isDocReviewer && this.inReview;
  }

  /**
   * Whether user can view document
   */
  canViewDocument() {
    return (this.user.readOwn('document') && this.isDocAuthor)
      || (this.user.readOwn('document') && this.isDocReviewer)
      || this.user.readAny('document');
  }
}
