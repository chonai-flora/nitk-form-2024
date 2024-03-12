import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "./Layout";

import {
  schedules,
  grades,
  courseIds,
  courseById,
} from "../constants";
import { InputValues } from "../@types";
import { useFirebase } from "../hooks/firebase";
import { formatCapacity } from "../utils/format";

const defaultValues: InputValues = {
  courseId: courseIds[0],
  schedule: schedules[0],
  grade: grades[0],
  name: {
    firstName: "",
    lastName: "",
  },
  email: "",
};

const Form = (): JSX.Element => {
  const navigate = useNavigate();
  const { getCapacities, submitForm } = useFirebase();
  const [capacities, setCapacities] = useState<{ [key: string]: number }>({});
  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<InputValues>({
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    getCapacities(watch("courseId"))
      .then((data) => setCapacities(data.data()))
      .catch((error) => console.error(error));
  }, [getCapacities, watch]);

  const onSubmit = async (): Promise<void> => {
    const values = getValues();
    const status = await submitForm(values);
    const courseId = courseIds.find((id) => id === watch("courseId"));

    navigate("/done/", {
      state: {
        status: status,
        title: courseById[courseId!].title,
        schedule: values.schedule,
        grade: values.grade,
        name: `${values.name.lastName} ${values.name.firstName}`,
        email: values.email,
      }
    });
  }

  if (capacities == null || schedules.some((schedule) => isNaN(capacities[schedule]))) {
    return (
      <Layout>
        <div className="my-5">
          <p>データを取得中です。</p>
          <p>しばらくお待ちください。</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <form
        autoComplete="on"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="mb-5">
          「熊本高専わいわい工作わくわく実験ひろば」の当日申し込みフォームです。
          ぜひお友達やご兄弟の方も誘ってご一緒にご参加ください。<br />
          ※講座開始の5分前までにお申し込みください。
        </p>

        <h2 className="mb-2 text-xl">1. コース</h2>
        {courseIds.map((courseId) => {
          const course = courseById[courseId];

          return (
            <label className="flex ml-5 my-2 text-gray-800 items-start" key={courseId}>
              <input
                id="courseId"
                type="radio"
                value={courseId}
                defaultChecked={courseId === defaultValues.courseId}
                {...register("courseId", {
                  required: true,
                  onChange: (() => {
                    getCapacities(watch("courseId"))
                      .then((data) => setCapacities(data.data()))
                      .catch((error) => console.error(error))
                  })
                })}
              />
              <div className="ml-1 -mt-1">
                <span>{course.title}</span>
                <p className="text-gray-500 text-sm">対象年齢: {course.target}</p>
                {courseId === watch("courseId") && (
                  <img src={course.icon} alt={course.title} className="py-1 w-full rounded-xl" />
                )}
              </div>
            </label>
          );
        })}
        <div className="mb-10" />

        <h2 className="mb-2 text-xl">2. 時間帯</h2>
        {schedules.map((schedule) => {
          const capacity = capacities[schedule];
          const acceptable = capacity > 0;

          return (
            <label className="flex ml-5 my-2 items-center" key={schedule}>
              <input
                id="schedule"
                type="radio"
                value={schedule}
                disabled={!acceptable}
                defaultChecked={schedule === defaultValues.schedule}
                {...register("schedule", {
                  required: true,
                })}
              />
              <span className={"ml-1 " + (capacity <= 0 && "text-gray-500")}>
                {schedule}&emsp;{formatCapacity(capacity)}
              </span>
            </label>
          );
        })}
        <div className="mb-10" />

        <h2 className="mb-2 text-xl">3. 学年</h2>
        <label className="flex ml-5 my-3">
          <select
            id="grade"
            className={
              "w-full rounded-md shadow-sm border-gray-300 " +
              "focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-indigo-300"
            }
            defaultValue={defaultValues.grade}
            {...register("grade", {
              required: true,
            })}
          >
            {grades.map((grade) => (
              <option value={grade} key={grade}>{grade}</option>
            ))}
          </select>
        </label>
        <div className="mb-10" />

        <h2 className="mb-2 text-xl">4. お名前</h2>
        <label className="flex ml-5 my-3 justify-around">
          <input
            id="name.lastName"
            className={
              "w-[49.5%] shadow-sm rounded-md border-gray-300 " +
              "focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-indigo-300"
            }
            placeholder="高専"
            {...register("name.lastName", {
              required: "必須項目です",
            })}
          />
          <input
            id="name.firstName"
            className={
              "w-[49.5%] shadow-sm rounded-md border-gray-300 " +
              "focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-indigo-300"
            }
            placeholder="太郎"
            {...register("name.firstName", {
              required: "必須項目です",
            })}
          />
        </label>
        <div className="mb-10" />

        <h2 className="mb-2 text-xl">5. 連絡可能なメールアドレス</h2>
        <label className="flex flex-col ml-5 my-3">
          <input
            id="email"
            type="email"
            className={
              "w-full rounded-md border-gray-300 shadow-sm " +
              "focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:border-indigo-300"
            }
            placeholder="xxxxx@example.com"
            defaultValue={defaultValues.email}
            {...register("email", {
              required: "有効なメールアドレスを入力してください",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "有効なメールアドレスを入力してください"
              }
            })}
          />
          <span className="flex text-sm text-red-500">
            {errors.email?.message}
          </span>
        </label>
        <div className="mb-12" />

        <input
          className="px-7 py-2 text-white bg-gray-400 hover:bg-gray-300 rounded"
          type="submit"
        />

        {errors.schedule || errors.name?.lastName || errors.name?.firstName || errors.email
          ? <span className="flex text-sm text-red-500">&#9888; 未回答もしくは無効な項目があります。</span>
          : <span className="flex text-sm text-red-500"><br /></span>}
      </form>
    </Layout>
  );
}

export default Form;