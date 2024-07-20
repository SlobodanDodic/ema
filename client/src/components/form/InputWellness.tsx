import { useState, ChangeEvent, FormEvent } from "react";
import InputDate from "./InputDate";
import { InputMembersProps, Member } from "../../types/formTypes";

export default function InputMembers({ title, members, setMembers, icon }: InputMembersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<Member>({
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMembers([...members, form]);
    setForm({ name: "", category: "", start: null, end: null });
    toggleModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleModal}
        className="inline-flex items-center px-5 py-2 my-2 text-sm font-medium text-center text-white rounded bg-stone-700 hover:bg-stone-700/90 focus:ring-2 focus:outline-none focus:ring-amber-500"
      >
        {icon}
        {title}
      </button>

      {isModalOpen && (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-stone-50"
        >
          <div className="relative w-full h-full max-w-2xl p-4 md:h-auto">
            <div className="relative p-6 bg-white rounded shadow-xl">
              <div className="flex items-center justify-between px-4 pb-4 border-b">
                <h3 className="text-lg font-semibold text-stone-700">Add {title} Member</h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-stone-700 bg-transparent hover:bg-stone-200 hover:text-stone-700 rounded text-sm py-1.5 px-2 ml-auto inline-flex items-center"
                >
                  X
                </button>
              </div>

              <form className="pt-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm text-stone-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="block w-full p-2 text-sm border rounded outline-none bg-stone-50 border-stone-300 text-stone-700 focus:border-2 focus:border-amber-600"
                      placeholder="Full name of member"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-stone-700">Category</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="block w-full p-2 text-sm border rounded outline-none bg-stone-50 border-stone-300 text-stone-700 focus:border-2 focus:border-amber-500"
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
                  className="inline-flex items-center p-4 text-sm text-center rounded text-stone-700 hover:bg-amber-500 focus:ring-2 focus:outline-none focus:ring-stone-600"
                >
                  ✛ Add new member
                </button>
              </form>

              <hr />

              <div className="p-4 text-sm font-semibold text-amber-600">{title} Members:</div>

              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 rtl:text-right">
                  <thead className="text-sm text-white bg-stone-700">
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
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member, index) => (
                      <tr key={index} className="border-b odd:bg-white even:bg-gray-100">
                        <th scope="row" className="px-6 py-4 text-gray-700 whitespace-nowrap">
                          {member.name}
                        </th>
                        <td className="px-6 py-4">{member.category}</td>
                        <td className="px-6 py-4">{member.start ? member.start.toLocaleDateString() : "N/A"}</td>
                        <td className="px-6 py-4">{member.end ? member.end.toLocaleDateString() : "N/A"}</td>
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
