import { useState, ChangeEvent, FormEvent } from "react";
import InputDate from "./InputDate";
import { InputMembersProps, Member } from "../../types/formTypes";

export default function InputMembers({ title, members, setMembers, icon }: InputMembersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Member>({
    id: Date.now(),
    name: "",
    category: "",
    start: null,
    end: null,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleStartChange = (date: Date | null) => {
    setForm({
      ...form,
      start: date,
    });
  };

  const handleEndChange = (date: Date | null) => {
    setForm({
      ...form,
      end: date,
    });
  };

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleEditMember = (member: Member) => {
    setForm(member);
    setIsEditing(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      setMembers(members.map((member) => (member.id === form.id ? form : member)));
    } else {
      setMembers([...members, form]);
    }
    setForm({ id: Date.now(), name: "", category: "", start: null, end: null });
    setIsEditing(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleModal}
        className="inline-flex items-center px-5 py-2 my-2 text-sm font-medium text-center text-white rounded bg-marine hover:bg-marine/90 focus:ring-2 focus:outline-none focus:ring-marine/70"
      >
        {icon}
        {title}
      </button>

      {isModalOpen && (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed -top-[1px] -left-[1px] right-0 z-50 flex items-center justify-center w-[101%] h-[101%] overflow-x-hidden overflow-y-auto bg-silver"
        >
          <div className="relative w-full h-full max-w-3xl p-1">
            <div className="relative p-6 bg-white rounded">
              <div className="flex items-center justify-between py-4 border-b border-marine/20">
                <h3 className="text-lg font-semibold text-marine">
                  {isEditing ? `Edit ${title} Member` : `Add ${title} Member`}
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="inline-flex items-center px-2 py-1 ml-auto bg-transparent rounded text-marine hover:bg-marine/20 hover:text-marine"
                >
                  X
                </button>
              </div>

              <form className="pt-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm text-marine">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="block w-full p-2 text-sm border rounded outline-none bg-marine/20 border-marine/30 text-marine focus:border-2 focus:border-marine/focus:ring-marine/70"
                      placeholder="Full name of member"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-marine">Category</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="block w-full p-2 text-sm border rounded outline-none bg-marine/20 border-marine/30 text-marine focus:border-2 focus:border-marine/focus:ring-marine/70"
                      required
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      <option value="Family">Family</option>
                      <option value="Friend">Friend</option>
                    </select>
                  </div>

                  <InputDate name="Date Start" selected={form.start} setSelected={handleStartChange} />
                  <InputDate name="Date End" selected={form.end} setSelected={handleEndChange} />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center p-3 mb-2 text-sm text-center text-white rounded bg-marine hover:bg-marine/90 focus:ring-2 focus:outline-none focus:ring-marine/60"
                >
                  {isEditing ? "Update a member ✐ " : "Add a member ✛ "}
                </button>
              </form>

              <div className="py-4 text-sm font-semibold border-t text-marine border-marine/20">{title} Members:</div>

              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 rtl:text-right">
                  <thead className="text-sm text-white bg-marine">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Member name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Start date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        End Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.id} className="border-b odd:bg-white even:bg-marine/10">
                        <th scope="row" className="px-6 py-4 text-marine whitespace-nowrap">
                          {member.name}
                        </th>
                        <td className="px-6 py-4 text-marine">{member.category}</td>
                        <td className="px-6 py-4 text-marine">{member.start ? member.start.toLocaleDateString() : "N/A"}</td>
                        <td className="px-6 py-4 text-marine">{member.end ? member.end.toLocaleDateString() : "N/A"}</td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() => handleEditMember(member)}
                            className="me-5 text-marine hover:text-sky-600"
                          >
                            ✎
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMember(member.id)}
                            className="text-marine hover:text-red-700"
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
