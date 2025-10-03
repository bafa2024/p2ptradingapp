import React from 'react';
import { List, Datagrid, TextField, DateField, Edit, SimpleForm, TextInput, Show, SimpleShowLayout } from 'react-admin';

export const KYCList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="user_id" label="User ID" />
      <TextField source="status" />
      <TextField source="document_type" label="Document Type" />
      <DateField source="submitted_at" label="Submitted" />
      <DateField source="reviewed_at" label="Reviewed" />
    </Datagrid>
  </List>
);

export const KYCEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="status" />
      <TextInput source="document_type" label="Document Type" />
      <TextInput source="notes" multiline />
    </SimpleForm>
  </Edit>
);

export const KYCShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="user_id" label="User ID" />
      <TextField source="status" />
      <TextField source="document_type" label="Document Type" />
      <TextField source="notes" />
      <DateField source="submitted_at" label="Submitted" />
      <DateField source="reviewed_at" label="Reviewed" />
    </SimpleShowLayout>
  </Show>
);

