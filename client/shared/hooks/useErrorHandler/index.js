import { useAlert } from 'react-alert';
import logger from 'utils/logger';
import { insertReplacements } from 'common/utils';

const useErrorHandler = () => {
  const alert = useAlert();

  const handleError = (error, message, replacements) => {
    const parsedMessage = insertReplacements(message, replacements);

    logger.error(error);
    alert.error(parsedMessage || error.message);
  };

  return handleError;
};

export default useErrorHandler;
