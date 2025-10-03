import React from 'react';
import { List, Datagrid, TextField, EmailField, DateField, Edit, SimpleForm, TextInput, Show, SimpleShowLayout } from 'react-admin';

export const UserList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="display_name" label="Name" />
      <EmailField source="email" />
      <TextField source="phone_number" label="Phone" />
      <TextField source="kyc_status" label="KYC Status" />
      <DateField source="created_at" label="Created" />
    </Datagrid>
  </List>
);

export const UserEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="display_name" label="Name" />
      <TextInput source="email" />
      <TextInput source="phone_number" label="Phone" />
      <TextInput source="kyc_status" label="KYC Status" />
    </SimpleForm>
  </Edit>
);

export const UserShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="display_name" label="Name" />
      <EmailField source="email" />
      <TextField source="phone_number" label="Phone" />
      <TextField source="kyc_status" label="KYC Status" />
      <DateField source="created_at" label="Created" />
      <DateField source="updated_at" label="Updated" />
    </SimpleShowLayout>
  </Show>
);

