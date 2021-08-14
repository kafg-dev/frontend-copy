import Errors from "components/FormItems/error/errors";
import axios from "axios";
import config from "../config";
import { mockUser } from "../actions/mock";

const mockUsers = {
  rows: [
    {
      id: "44cd4090-a641-443d-bdf5-51debfa10356",
      no_disable: true,
      firstName: "Admin",
      password: "$2b$12$f9gxlU6NITftRgFtv4iqAe9oF9e.E0NuOc4ghKIg2AAKUREIRDzga",
      role: "admin",
      provider: "local",
      emailVerified: true,
      emailVerificationToken: null,
      emailVerificationTokenExpiresAt: null,
      passwordResetToken: null,
      passwordResetTokenExpiresAt: null,
      lastName: null,
      phoneNumber: null,
      email: "admin@flatlogic.com",
      authenticationUid: null,
      disabled: false,
      importHash: null,
      createdAt: "2021-08-14T05:00:01.566Z",
      updatedAt: "2021-08-14T05:00:01.566Z",
      deletedAt: null,
      createdById: null,
      updatedById: null,
      avatars: [],
    },
    {
      id: "737943b3-e161-4cec-9fc9-b0d632c8e605",
      no_disable: true,
      firstName: "John",
      password: "$2b$12$f9gxlU6NITftRgFtv4iqAe9oF9e.E0NuOc4ghKIg2AAKUREIRDzga",
      role: "user",
      provider: "local",
      emailVerified: true,
      emailVerificationToken: null,
      emailVerificationTokenExpiresAt: null,
      passwordResetToken: null,
      passwordResetTokenExpiresAt: null,
      lastName: null,
      phoneNumber: null,
      email: "john@doe.com",
      authenticationUid: null,
      disabled: false,
      importHash: null,
      createdAt: "2021-08-14T05:00:01.566Z",
      updatedAt: "2021-08-14T05:00:01.566Z",
      deletedAt: null,
      createdById: null,
      updatedById: null,
      avatars: [],
    },
    {
      id: "ec3aafb8-7695-4b7e-b5e1-06a1ad0110e5",
      no_disable: true,
      firstName: "Client",
      password: "$2b$12$f9gxlU6NITftRgFtv4iqAe9oF9e.E0NuOc4ghKIg2AAKUREIRDzga",
      role: "user",
      provider: "local",
      emailVerified: true,
      emailVerificationToken: null,
      emailVerificationTokenExpiresAt: null,
      passwordResetToken: null,
      passwordResetTokenExpiresAt: null,
      lastName: null,
      phoneNumber: null,
      email: "client@hello.com",
      authenticationUid: null,
      disabled: false,
      importHash: null,
      createdAt: "2021-08-14T05:00:01.566Z",
      updatedAt: "2021-08-14T05:00:01.566Z",
      deletedAt: null,
      createdById: null,
      updatedById: null,
      avatars: [],
    },
  ],
  count: 3,
};

async function list() {
  return mockUsers; //Dummy
  const response = await axios.get(`/users`);
  return response.data;
}

const actions = {
  doFetch:
    (filter, keepPagination = false) =>
    async (dispatch) => {
      if (!config.isBackend) {
        dispatch({
          type: "USERS_LIST_FETCH_SUCCESS",
          payload: {
            rows: [mockUser],
            count: 1,
          },
        });
      } else {
        try {
          dispatch({
            type: "USERS_LIST_FETCH_STARTED",
            payload: { filter, keepPagination },
          });

          const response = await list();

          dispatch({
            type: "USERS_LIST_FETCH_SUCCESS",
            payload: {
              rows: response.rows,
              count: response.count,
            },
          });
        } catch (error) {
          Errors.handle(error);

          dispatch({
            type: "USERS_LIST_FETCH_ERROR",
          });
        }
      }
    },

  doDelete: (id) => async (dispatch) => {
    if (!config.isBackend) {
      dispatch({
        type: "USERS_LIST_DELETE_ERROR",
      });
    } else {
      try {
        dispatch({
          type: "USERS_LIST_DELETE_STARTED",
        });

        await axios.delete(`/users/${id}`);

        dispatch({
          type: "USERS_LIST_DELETE_SUCCESS",
        });

        const response = await list();
        dispatch({
          type: "USERS_LIST_FETCH_SUCCESS",
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: "USERS_LIST_DELETE_ERROR",
        });
      }
    }
  },
  doOpenConfirm: (id) => async (dispatch) => {
    dispatch({
      type: "USERS_LIST_OPEN_CONFIRM",
      payload: {
        id: id,
      },
    });
  },
  doCloseConfirm: () => async (dispatch) => {
    dispatch({
      type: "USERS_LIST_CLOSE_CONFIRM",
    });
  },
};

export default actions;
