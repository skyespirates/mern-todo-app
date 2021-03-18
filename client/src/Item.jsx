import React from "react";
import { ListItem, ListItemText, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
export default function Item({ _id, todo, handleDelete }) {
  return (
    <ListItem>
      <ListItemText>{todo}</ListItemText>
      <IconButton onClick={() => handleDelete(_id)}>
        <Delete color="secondary" />
      </IconButton>
    </ListItem>
  );
}
