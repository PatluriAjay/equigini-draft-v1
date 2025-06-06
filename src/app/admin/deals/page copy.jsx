"use client";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const deals = [
	{ id: 1, name: "Project Telecom", sector: "Telecom", ticket: "₹1Cr - ₹5Cr", status: "Open" },
	{ id: 2, name: "Project Banking", sector: "Finance", ticket: "₹50L - ₹2Cr", status: "Draft" },
];

export default function DealsPage() {
	const router = useRouter();

	return (
		<div className="flex flex-col h-[calc(100vh-8rem)] p-4 bg-white rounded-lg box-shadow-lg mt-5">
			<div className="w-full  bg-white p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="font20 sub-heading ">
						Manage Deals
					</h2>
					<button
						className=" create-secondary-button"
						onClick={() => router.push("/admin/deals/create-deal")}
					>
						+ CREATE
					</button>
				</div>
				<div className="overflow-x-auto">
					<table className="equi-table">
						<thead>
							<tr className="bg-tertiary-color-3 ">
								<th className="equi-table-header-cell poppins-font">Title</th>
								<th className="equi-table-header-cell poppins-font">Sector</th>
								<th className="equi-table-header-cell poppins-font">Status</th>
								<th className="equi-table-header-cell poppins-font">Ticket Range</th>
								<th className="equi-table-header-cell poppins-font">Actions</th>
							</tr>
						</thead>
						<tbody>
							{deals.map((deal) => (
								<tr key={deal.id} className="equi-table-row">
									<td className="equi-table-cell poppins-font">{deal.name}</td>
									<td className="equi-table-cell poppins-font">{deal.sector}</td>
									<td className="equi-table-cell poppins-font">{deal.status}</td>
									<td className="equi-table-cell poppins-font">{deal.ticket}</td>
									<td className="equi-table-cell poppins-font">
										<div className="equi-table-actions">
											<button className="equi-action-btn mr-2 equi-action-editbtn">
												<FaRegEdit />
											</button>
											<button className="equi-action-btn equi-action-deletebtn">
												<FaTrashAlt />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
