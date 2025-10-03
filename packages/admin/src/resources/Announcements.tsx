import React from 'react';
import { List, Datagrid, TextField, DateField, Edit, SimpleForm, TextInput, Show, SimpleShowLayout } from 'react-admin';

export const AnnouncementList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="type" />
      <TextField source="status" />
      <DateField source="created_at" label="Created" />
      <DateField source="published_at" label="Published" />
    </Datagrid>
  </List>
);

export const AnnouncementEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="type" />
      <TextInput source="status" />
      <TextInput source="content" multiline />
    </SimpleForm>
  </Edit>
);

export const AnnouncementShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="type" />
      <TextField source="status" />
      <TextField source="content" />
      <DateField source="created_at" label="Created" />
      <DateField source="published_at" label="Published" />
    </SimpleShowLayout>
  </Show>
);

