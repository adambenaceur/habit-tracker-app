import axios from "axios";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import { db } from "./../../../lib/firebase";
export const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await axios.get("https://api.github.com/users");
        return users.data.map(({ id, login, avatar_url }) => ({
          id,
          login,
          avatar_url,
        }));
      } catch (error) {
        throw error;
      }
    },
    getUser: async (_, args) => {
      try {
        const user = await axios.get(
          `https://api.github.com/users/${args.name}`
        );
        return {
          id: user.data.id,
          login: user.data.login,
          avatar_url: user.data.avatar_url,
        };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createHabit: async (_, args) => {
      try {
        const docRef = await addDoc(collection(db, "DailyHabits"), {
          userID: args.userID,
          starred: args.starred,
          title: args.title,
          description: args.description,
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
      } catch (error) {
        throw error;
      }
    },

    setDailyHabit: async (_, args) => {
      try {
        const formatedDate = new Date(args.date).toISOString().split("T")[0];
        console.log(args, formatedDate);
        const res = await getDoc(doc(db, "DailyHabits", args.habitId));
        if (res.data().habits && res.data().habits.length > 0) {
          const { habits } = res.data();
          const DailyHabit = habits.filter(
            (habit) => habit.date === formatedDate
          );
          if (DailyHabit.length === 0) {
            const newHabit = {
              id: new Date().getTime(),
              date: formatedDate,
              done: true,
            };
            await updateDoc(doc(db, "DailyHabits", args.habitId), {
              habits: arrayUnion({
                id: new Date().getTime(),
                date: formatedDate,
                done: true,
              }),
            });
            // console.log(res);
            return "When the habit with older date not exit";
          } else {
            await updateDoc(doc(db, "DailyHabits", args.habitId), {
              habits: {
                done: false,
              },
            });

            return "When the habit is updated with older date";
          }
        } else {
          await updateDoc(doc(db, "DailyHabits", args.habitId), {
            habits: arrayUnion({
              id: new Date().getTime(),
              date: formatedDate,
              done: true,
            }),
          });

          return "When the habit is  new created";
        }

        // const habitsRef = collection(db, "DailyHabits");
        // console.log("Habit Ref", habitsRef);
        // const q = query(habitsRef, where("date", "==", formatedDate));

        // console.log("query", q);
        // const res = await getDoc(doc(db, "Habits", args.habitId));

        // if (res.exists()) {
        //   console.log(res.data());
        // }

        // console.log("Args", args);
        // const docRef = await addDoc(collection(db, "DailyHabits"), {
        //   userID: args.userID,

        //   habitId: args.habitId,
        //   done:
        //   date: args.date,
        // });
        // console.log("Document written with ID: ", res);
        return args.habitId;
      } catch (error) {
        throw error;
      }
    },
    setMood: async (_, args) => {
      try {
        const docRef = await addDoc(collection(db, "DailyMood"), {
          type: args.type,
          date: args.date,
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
      } catch (error) {
        throw error;
      }
    },
  },
};
