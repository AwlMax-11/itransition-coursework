import React from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Photo.module.scss';
import { UserInfo } from '../UserInfo';
import { PhotoSkeleton } from './Skeleton';

export const Photo = ({
  id,
  title,
  createdAt,
  image,
  username,
  viewsCount,
  commentsCount,
  category,
  children,
  isFullPhoto,
  isLoading,
  isEditable,
}) => {
  if (isLoading) {
    return <PhotoSkeleton />;
  }

  const onClickRemove = () => {};

  console.log("1",{ id, title, image, username, createdAt, viewsCount, commentsCount, category, isEditable });

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPhoto })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/photos/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {image && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPhoto })}
          src={image}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...username} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPhoto })}>
            {isFullPhoto ? title : <Link to={`/photos/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.category}>
            {Array.isArray(category) ? category.map((username) => (
              <li key={username}>
                <Link to={`/category/${username}`}>#{username}</Link>
              </li>
            )) : <li>Uncategorized</li>}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
