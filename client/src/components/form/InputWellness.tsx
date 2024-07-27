import { ChangeEvent, FormEvent, useState } from "react";
import { InputMembersProps, Member } from "../../types/formTypes";
import InputDate from "./InputDate";
import InputSelect from "./InputSelect";
import InputText from "./InputText";
import MembersTable from "./MembersTable";
import { insuranceCompany, memberConnection, memberEmployee } from "./categories";

export default function InputMembers({ beneficiary, title, members, setMembers, icon }: InputMembersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Member>({
    id: Date.now().toString(),
    name: "",
    category: "",
    insurance: "",
    start: null,
    end: null,
  });
  const [showValidationMessage, setShowValidationMessage] = useState(false);

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

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleEditMember = (member: Member) => {
    setForm(member);
    setIsEditing(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (title === "Health Care Members" && (!form.name || !form.category || !form.insurance)) ||
      (title === "Fitpass Members" && (!form.name || !form.category))
    ) {
      setShowValidationMessage(true);
      return;
    }
    setShowValidationMessage(false);
    if (isEditing) {
      setMembers(members.map((member) => (member.id === form.id ? form : member)));
    } else {
      setMembers([...members, { ...form, id: Date.now().toString() }]);
    }
    setForm({ id: Date.now().toString(), name: "", category: "", insurance: "", start: null, end: null });
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
                  {members.length > 0 ? "Save" : "Leave"}
                </button>
              </div>

              <form className="pt-4" onSubmit={handleSubmit}>
                <div className="flex w-full">
                  <div className="flex flex-col w-1/2 pe-4">
                    <InputText name="name" value={form.name} onChange={handleChange} label="Full Name" />
                    <InputSelect
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      options={beneficiary === form.name ? memberEmployee : memberConnection}
                      placeholder="Select category"
                    />
                    <div className="my-6">
                      {title === "Health Care Members" ? (
                        <InputSelect
                          name="insurance"
                          value={form.insurance}
                          onChange={handleChange}
                          options={insuranceCompany}
                          placeholder="Select insurance"
                        />
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col w-1/2 mt-4 ps-4">
                    <InputDate name="Date Start" selected={form.start} setSelected={handleStartChange} />
                    <InputDate name="Date End" selected={form.end} setSelected={handleEndChange} />
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center p-3 mb-6 text-sm text-center text-white rounded bg-marine hover:bg-marine/90 focus:ring-2 focus:outline-none focus:ring-marine/60"
                >
                  {isEditing ? "Update a member ✐ " : "Add a member ✛ "}
                </button>
              </form>

              {showValidationMessage && <div className="text-red-600">All fields are required!</div>}

              <MembersTable
                title={title}
                members={members}
                handleEditMember={handleEditMember}
                handleDeleteMember={handleDeleteMember}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
