// import { booleanArg, arg, stringArg, idArg, mutationType } from "nexus";
// import * as bcrypt from "bcryptjs";
// import { APP_SECRET, getUserId } from "../utils";
// import { sign } from "jsonwebtoken";
// import { Context } from "../types";

// export const Mutation = mutationType({
//   definition(t) {
   
   
//     t.field("createHabit", {
//       type: "Habit",
//       args: {
//         id: idArg({ default: "", required: false }),
//         title: stringArg({ required: true }),
//         description: stringArg({ required: false, default: "" }),
//         starred: booleanArg({ default: false, nullable: true }),
//       },
//       resolve: (parent, { id, title, description, starred }, ctx) => {
//         const userId = getUserId(ctx);
//         return ctx.prisma.upsertHabit({
//           where: { id },
//           create: {
//             description: description || "",
//             starred: !!starred,
//             title,
//             owner: { connect: { id: userId } },
//           },
//           update: {
//             ...(description && { description }),
//             ...(title && { title }),
//             starred: !!starred,
//           },
//         });
//       },
//     });
 
//     t.field("setDailyHabit", {
//       type: "DayHabit",
//       args: {
//         habitId: idArg(),
//         date: stringArg({
//           default: new Date().toISOString().split("T")[0],
//           required: false,
//         }),
//       },
//       resolve: async (parent, { habitId, date }, ctx) => {
//         const userId = getUserId(ctx);
//         const query = `
//           query habit($habitId:ID!, $date: DateTime!){
//             habit(where:{id: $habitId}) {
//               habits(where:{date: $date}){
//                 id
//                 done
//                 date
//               }
//             }
//           }
//         `;

//         const { habit } = await ctx.prisma.$graphql(query, {
//           habitId,
//           date,
//         });

//         if (habit.habits.length === 0) {

//           console.log("Create DayHabit");
//           return ctx.prisma.createDayHabit({
//             date,
//             done: true,
//             habit: { connect: { id: habitId } },
//           });
//         } else {
//           console.log("Update DayHabit");
//           return ctx.prisma.updateDayHabit({
//             where: { id: habit.habits[0].id },
//             data: {
//               date,
//               done: !habit.habits[0].done,
//             },
//           });
//         }
//       },
//     });
 
//   },
// });
