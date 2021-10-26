import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {serverAPI} from '../../components/serverAPI';

export const reportAction = createAsyncThunk('user/report', async data => {
  const result = await axios.post(`${serverAPI}/user/report`, data);
  return result.data;
});

export const getFriendList = createAsyncThunk('user/list', async data => {
  const list = await axios.post(`${serverAPI}/user/list`, data);
  return list.data;
});

export const deleteFriend = createAsyncThunk('user/delete', async data => {
  const result = await axios.post(`${serverAPI}/user/delete/friend`, data);
  return result.data;
});

export const sendToken = createAsyncThunk('user/token', async data => {
  const result = await axios.post(`${serverAPI}/user/token`, data);
  return result.data;
});

export const offAlert = createAsyncThunk('user/alert/off', async data => {
  const result = await axios.post(`${serverAPI}/user/off/alert`, data);
  return result.data;
});

export const onAlert = createAsyncThunk('user/alert/on', async data => {
  const result = await axios.post(`${serverAPI}/user/on/alert`, data);
  return result.data;
});
