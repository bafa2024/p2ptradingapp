import React from 'react';
import { List, Datagrid, TextField, DateField, Edit, SimpleForm, TextInput, Show, SimpleShowLayout } from 'react-admin';

export const DisputeList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="trade_id" label="Trade ID" />
      <TextField source="status" />
      <TextField source="reason" />
      <DateField source="created_at" label="Created" />
      <DateField source="resolved_at" label="Resolved" />
    </Datagrid>
  </List>
);

export const DisputeEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="status" />
      <TextInput source="reason" />
      <TextInput source="resolution" multiline />
    </SimpleForm>
  </Edit>
);

export const DisputeShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="trade_id" label="Trade ID" />
      <TextField source="status" />
      <TextField source="reason" />
      <TextField source="resolution" />
      <DateField source="created_at" label="Created" />
      <DateField source="resolved_at" label="Resolved" />
    </SimpleShowLayout>
  </Show>
);

