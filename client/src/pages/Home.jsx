import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Photo } from '../components/Photo';
import { fetchPhoto } from '../redux/slices/photos';
// import { TagsBlock } from '../components/TagsBlock';
// import { CommentsBlock } from '../components/CommentsBlock';

export const Home = () => {
  const dispatch = useDispatch();
  const { photos } = useSelector(state => state.photos);

  const isPhotosLoading = photos.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPhoto());
  }, []);

  console.log("2", photos);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          {(isPhotosLoading ? [...Array(5)] : photos.items).map((obj, index) => 
            isPhotosLoading ? (
              <Photo key={index} isLoading={true} />
            ) : (
              <Photo
                key={obj.id} 
                id={obj.id}
                title={obj.title}
                image={obj.image || "https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"}
                user={obj.users?.username || { avatarUrl: '', fullName: 'Unknown' }}
                createdAt={obj.createdAt || 'Unknown date'}
                viewsCount={obj.viewsCount || 0}
                commentsCount={obj.commentsCount || 0}
                category={obj.category || []}
                isEditable={obj.isEditable || false}
              />
            )
          )}
        </Grid>
        <Grid item xs={4}>
          {/* <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} /> */}
          {/* <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};
