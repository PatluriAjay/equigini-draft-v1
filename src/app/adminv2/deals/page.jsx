"use client";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const deals = [
	{ id: 1, name: "Project Telecom", sector: "Telecom", ticket: "₹1Cr - ₹5Cr" },
	{ id: 2, name: "Project Banking", sector: "Finance", ticket: "₹50L - ₹2Cr" },
];

export default function DealsPage() {
	const router = useRouter();

	return (
		<div className=" min-h-screen flex flex-col items-center ">
			<div className="w-full  bg-white ">
				<div className="flex justify-between items-center mb-6">
					<h2 className="font20 sub-heading ">
						Manage Deals
					</h2>
					<button
						className=" create-secondary-button"
						onClick={() => router.push("/adminv2/deals/create")}
					>
						+ CREATE
					</button>
				</div>
				<div className="overflow-x-auto">
					<table className="equi-table">
						<thead>
							<tr className="bg-tertiary-color-3 ">
								<th className="equi-table-header-cell">Deal</th>
								<th className="equi-table-header-cell">Sector</th>
								<th className="equi-table-header-cell">Ticket Range</th>
								<th className="equi-table-header-cell">Actions</th>
							</tr>
						</thead>
						<tbody>
							{deals.map((deal) => (
								<tr key={deal.id} className="equi-table-row">
									<td className="equi-table-cell">{deal.name}</td>
									<td className="equi-table-cell">{deal.sector}</td>
									<td className="equi-table-cell">{deal.ticket}</td>
									<td className="equi-table-cell">
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
