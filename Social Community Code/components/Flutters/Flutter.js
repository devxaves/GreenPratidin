import { useState } from "react";
import { useUser } from "../../context/UserContext";
import {
  createStyles,
  Text,
  Avatar,
  Group,
  Card,
  ActionIcon,
  Modal,
  Menu,
  Textarea,
  Button,
  Image
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from '@mantine/notifications';
import { Edit, Trash, Heart, Share, BrandTwitter, Check } from "tabler-icons-react";
import FileBase64 from 'react-file-base64'

const tweetUrl = "https://twitter.com/intent/tweet?url=https%3A%2F%2Fgreen-pratidin.vercel.app%2F&text=Check%20out%20this%20social%20community%20built%20for%20environmental%20sustainability%20";

const useStyles = createStyles((theme) => ({
  flutter: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    marginBottom: theme.spacing.sm,
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },

  liked: {
    fill: theme.colors.red[6],
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  filebase: {
    display: "inline-flex",
    width: "250px",
    height: "max-content",
    padding: "5px 10px",
    background: "#eaeaea",
    margin: "15px 0",
    borderRadius: "5px"
  }
}));
var file=""
const Flutter = ({ flutter, setFlutters }) => {
  const { _id, postedAt, body, user: flutterUser, likes } = flutter;
  const user = useUser();
  const [modalOpened, setModalOpened] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [updatingLike, setUpdatingLike] = useState(false);
  const [likesState, setLikesState] = useState(likes);
  const [inputDisabled, setInputDisabled] = useState(false);
  const { classes, theme } = useStyles();
file=body[1]
  const form = useForm({
    initialValues: {
      editFlutter: body[0],
    },
  });

  const editFlutter = () => {
    form.setFieldValue("editPost", body);
    setModalOpened(true);
  };

  const onUpdateFlutter = async (value,selectedFile) => {
    setInputDisabled(true);
    const response = await fetch("/api/flutter", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        body: [value.editFlutter,selectedFile],
      }),
    });

    const responseJson = await response.json();

    console.log(responseJson); 

    setFlutters((flutters) =>
      flutters.map((flutter) => {
        if (flutter._id === _id) {
          return {
            ...flutter,
            body: [value.editFlutter,selectedFile],
          };
        }

        return flutter;
      })
    );

    form.reset();
    setInputDisabled(false);
    setModalOpened(false);
    showSuccess('Your Post has been updated');
  };

  const likeFlutter = async () => {
    setUpdatingLike(true);
    let action = likesState.includes(user.id) ? "$pull" : "$addToSet";

    await fetch("/api/flutter/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        userId: user.id,
        action,
      }),
    });

    setLikesState((likes) => {
      if (likesState.includes(user.id)) {
        return likes.filter((like) => like !== user.id);
      }
      return [...likes, user.id];
    });
    setUpdatingLike(false);
  };

  const deleteFlutter = async () => {
    const response = await fetch(`/api/flutter/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
      }),
    });
    const responseJson = await response.json();
    setDeleted(true);
    console.log(responseJson); 
    showSuccess('Your Post has been deleted');
  };

  const showSuccess = (message) => {
    showNotification({
      title: "Success",
      message,
      icon: <Check size={18} />,
      autoClose: 5000,
      styles: (theme) => ({
        root: {
          borderColor: theme.colors.green[6],
        }
      }),
    });
  };

  return (
    <>
      {!deleted && (
        <>
          <Modal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            title="Edit your Post"
          >
            <form onSubmit={form.onSubmit((value) => onUpdateFlutter(value,file))}>
              <Textarea
                required
                data-autofocus
                placeholder="Edit your Post"
                variant="filled"
                className={classes.media}
                {...form.getInputProps("editFlutter")}
              />
              <div className={classes.filebase}>
                <FileBase64
                type="file"
                            multiple={false}
                            onDone={({ base64 }) =>
                file=base64
                            }
                            />
              </div>
              <Group position={"right"} mt={20}>
                <Button type="submit" disabled={inputDisabled}>Update</Button>
              </Group>
            </form>
          </Modal>
          <Card withBorder radius="md" className={classes.flutter}>
            <Group>
              <Avatar
                src={flutterUser.picture}
                alt={flutterUser.name}
                radius="xl"
              />
              <div>
                <Text size="sm">{flutterUser.nickname}</Text>
                <Text size="xs" color="dimmed">
                  {new Date(postedAt).toLocaleString()}
                </Text>
              </div>
            </Group>
            <Text className={classes.body} size="sm">
              {body[0]}
            </Text>
            <Image src={body[1]}/>
            <Card.Section className={classes.footer}>
              <Group position="apart">
                <Text size="xs" color="dimmed">
                  {likesState ? likesState.length : 0}
                  {` ${likesState.length === 1 ? "person" : "people"} liked this`}
                </Text>
                <Group spacing={0}>
                  <ActionIcon onClick={() => likeFlutter()} size="lg" loading={updatingLike}>
                    <Heart
                      size={18}
                      color={theme.colors.red[6]}
                      className={
                        likesState.includes(user.id) ? classes.liked : null
                      }
                    />
                  </ActionIcon>
                  <Menu
                    control={
                      <ActionIcon size="lg">
                        <Share size={16} color={theme.colors.blue[6]} />
                      </ActionIcon>
                    }
                    transition="fade"
                    position="bottom"
                    placement="start"
                    size="lg"
                  >
                    <Menu.Item
                      icon={
                        <BrandTwitter size={16} color={theme.colors.blue[4]} />
                      }
                      component="a"
                      href={tweetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </Menu.Item>
                  </Menu>
                  {user.id === flutterUser.id && (
                    <>
                      <ActionIcon
                        onClick={() => editFlutter()}
                        size="lg"
                        sx={(theme) => ({
                          color:
                            theme.colorScheme === "dark"
                              ? theme.colors.green[4]
                              : theme.colors.green[6],
                        })}
                      >
                        <Edit size={18} />
                      </ActionIcon>
                      <ActionIcon
                        onClick={() => deleteFlutter()}
                        size="lg"
                        sx={(theme) => ({
                          color:
                            theme.colorScheme === "dark"
                              ? theme.colors.red[4]
                              : theme.colors.red[6],
                        })}
                      >
                        <Trash size={18} />
                      </ActionIcon>
                    </>
                  )}
                </Group>
              </Group>
            </Card.Section>
          </Card>
        </>
      )}
    </>
  );
}

export default Flutter;
